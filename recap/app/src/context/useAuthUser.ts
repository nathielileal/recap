import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';

export function useAuthUser() {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const id = await AuthService.getAuthIDUser();
            setCurrentUserId(id);
            setIsLoading(false);
        };

        fetchUser();
    }, []);

    return { currentUserId, isLoading };
}