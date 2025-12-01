import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Social } from '../models/social';

export const useRecommendationViewModel = () => {
    const [filter, setFilter] = useState<"public" | "private" | "mine">("public");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        // setLoading(true);

        // try {
        //   const data = await UserService.getUser();

        //   setUser(data);
        // } catch (apiError: any) {
        //   setError(apiError.message || "Erro inesperado ao carregar informações do usuário.");
        //   setUser(null);

        // } finally {
        //   setLoading(false);
        // }
    };

    return { loading, filter, setFilter };
};