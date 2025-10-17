import React, { useState, useEffect } from 'react';
import { UserCheck, UserX, Wifi, WifiOff, RotateCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';

const VolunteerAvailabilityToggle = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    fetchMyAvailability();
  }, []);

  const fetchMyAvailability = async () => {
    try {
      const response = await api.get('/auth/volunteers/availability');
      // Find current user in the volunteers list
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const myData = response.data.volunteers.find(v => v.id === currentUser.id);
      if (myData) {
        setIsAvailable(myData.status === 'available');
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      toast.error('Failed to load availability status');
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    if (toggling) return;
    
    setToggling(true);
    try {
      const response = await api.put('/auth/availability/toggle');
      setIsAvailable(response.data.isAvailable);
      
      toast.success(
        response.data.isAvailable 
          ? '✅ You are now available for incidents!' 
          : '⏸️ You are now unavailable for incidents'
      );
    } catch (error) {
      console.error('Failed to toggle availability:', error);
      toast.error('Failed to update availability status');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading availability status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Wifi className="w-5 h-5 mr-2" />
          Your Availability Status
        </h3>
        <button
          onClick={fetchMyAvailability}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          disabled={loading}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>

      <div className="text-center">
        {/* Current Status Display */}
        <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium mb-4 ${
          isAvailable 
            ? 'bg-green-100 text-green-800 border-2 border-green-200' 
            : 'bg-gray-100 text-gray-800 border-2 border-gray-200'
        }`}>
          {isAvailable ? (
            <>
              <UserCheck className="w-6 h-6 mr-2" />
              Available for Incidents
            </>
          ) : (
            <>
              <UserX className="w-6 h-6 mr-2" />
              Not Available
            </>
          )}
        </div>

        {/* Status Description */}
        <p className="text-gray-600 mb-6">
          {isAvailable 
            ? "You will receive notifications about new incidents in your area and can respond to help." 
            : "You will not receive incident notifications. Toggle to 'Available' when you're ready to help."
          }
        </p>

        {/* Toggle Button */}
        <button
          onClick={toggleAvailability}
          disabled={toggling}
          className={`inline-flex items-center px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50 ${
            isAvailable
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {toggling ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Updating...
            </>
          ) : isAvailable ? (
            <>
              <UserX className="w-5 h-5 mr-2" />
              Mark as Unavailable
            </>
          ) : (
            <>
              <UserCheck className="w-5 h-5 mr-2" />
              Mark as Available
            </>
          )}
        </button>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            </div>
            <div className="ml-3 text-left">
              <h4 className="text-sm font-medium text-blue-900">How it works:</h4>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• When available, you'll receive real-time notifications about incidents</li>
                <li>• Users can see your availability status when requesting help</li>
                <li>• You can toggle your status anytime based on your schedule</li>
                <li>• Your location sharing preferences remain separate from availability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAvailabilityToggle;