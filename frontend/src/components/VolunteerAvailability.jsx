import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Wifi, WifiOff, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';

const VolunteerAvailability = ({ compact = false }) => {
  const [availabilityData, setAvailabilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAvailability();
    // Refresh availability every 30 seconds
    const interval = setInterval(fetchAvailability, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await api.get('/auth/volunteers/availability');
      setAvailabilityData(response.data);
    } catch (error) {
      console.error('Failed to fetch volunteer availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastSeen = (lastSeen) => {
    const now = new Date();
    const seen = new Date(lastSeen);
    const diffMinutes = Math.floor((now - seen) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'offline':
        return 'text-yellow-600 bg-yellow-100';
      case 'unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <UserCheck className="w-4 h-4" />;
      case 'offline':
        return <WifiOff className="w-4 h-4" />;
      case 'unavailable':
        return <UserX className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!availabilityData) {
    return (
      <div className="text-center p-4 text-gray-500">
        <Users className="w-8 h-8 mx-auto mb-2" />
        <p>Unable to load volunteer availability</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Volunteer Status
          </h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-primary-600 hover:text-primary-700"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 p-2 rounded">
            <div className="text-lg font-bold text-green-600">
              {availabilityData.summary.available}
            </div>
            <div className="text-xs text-green-600">Available</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <div className="text-lg font-bold text-yellow-600">
              {availabilityData.summary.offline}
            </div>
            <div className="text-xs text-yellow-600">Offline</div>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <div className="text-lg font-bold text-red-600">
              {availabilityData.summary.unavailable}
            </div>
            <div className="text-xs text-red-600">Unavailable</div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-2">
            {availabilityData.volunteers.map((volunteer) => (
              <div key={volunteer.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                <span className="font-medium">{volunteer.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full flex items-center ${getStatusColor(volunteer.status)}`}>
                    {getStatusIcon(volunteer.status)}
                    <span className="ml-1 capitalize">{volunteer.status}</span>
                  </span>
                  <span className="text-gray-500">
                    {formatLastSeen(volunteer.lastSeen)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Users className="w-6 h-6 mr-3" />
          Volunteer Availability
        </h2>
        <button
          onClick={fetchAvailability}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
        >
          <Clock className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-gray-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Volunteers</p>
              <p className="text-2xl font-bold text-gray-900">{availabilityData.summary.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-500">Available Now</p>
              <p className="text-2xl font-bold text-green-900">{availabilityData.summary.available}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <WifiOff className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-500">Offline</p>
              <p className="text-2xl font-bold text-yellow-900">{availabilityData.summary.offline}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UserX className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-500">Unavailable</p>
              <p className="text-2xl font-bold text-red-900">{availabilityData.summary.unavailable}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900">Volunteer Details</h3>
        {availabilityData.volunteers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3" />
            <p>No volunteers registered</p>
          </div>
        ) : (
          <div className="space-y-2">
            {availabilityData.volunteers.map((volunteer) => (
              <div key={volunteer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${getStatusColor(volunteer.status)}`}>
                    {getStatusIcon(volunteer.status)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">{volunteer.name}</h4>
                    <p className="text-sm text-gray-500">
                      {volunteer.hasLocation ? '📍 Location available' : '📍 No location set'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                    {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Last seen: {formatLastSeen(volunteer.lastSeen)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerAvailability;