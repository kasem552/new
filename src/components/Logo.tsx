import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link to="/" className="block">
        <img
          src="https://epewufetafbtpqiribsc.supabase.co/storage/v1/object/public/members/canaan.png"
          alt="Canaan Culture Media"
          className="h-32 w-auto" // Increased from h-24 to h-32 for larger size
          style={{
            objectFit: 'contain',
            maxWidth: '600px' // Increased from 480px to 600px for larger size
          }}
        />
      </Link>
    </div>
  );
}