'use client';

import React, { useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { AlertCircle, MapPin } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

export default function PageClient() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    startWatchingLocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleSuccess = (position: GeolocationPosition): void => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    });
    setLoading(false);
  };

  const handleError = (error: GeolocationError): void => {
    let errorMessage: string;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location permission denied';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }
    setError(errorMessage);
    setLoading(false);
  };

  const startWatchingLocation = (): void => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError as PositionErrorCallback,
      options,
    );

    setWatchId(id);
  };

  const refreshLocation = (): void => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
    startWatchingLocation();
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold">Live Location</h2>

      <button
        onClick={refreshLocation}
        disabled={loading}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        type="button"
      >
        <MapPin className="h-5 w-5" />
        {loading ? 'Getting Location...' : 'Refresh Location'}
      </button>

      {error && (
        <Alert
          variant="destructive"
          className="mb-4"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {location && (
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 font-semibold">Your Location:</h3>
          <p className="mb-1">Latitude: {location.latitude.toFixed(6)}</p>
          <p className="mb-1">Longitude: {location.longitude.toFixed(6)}</p>
          <p className="mb-1">Accuracy: ±{Math.round(location.accuracy)} meters</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(location.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}
