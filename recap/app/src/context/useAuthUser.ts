import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';

export function useAuthUser() {
    const [loggegId, setLoggedId] = useState<string | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const userId = await AuthService.getAuthIDUser();

        setLoggedId(userId);
    };

    return { loggegId };
}