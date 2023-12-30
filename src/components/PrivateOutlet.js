import React from 'react'

function PrivateOutlet({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}

export default PrivateOutlet