import { useEffect, useState } from "react";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

export function useFriendsViewModel() {
    const [filter, setFilter] = useState<"public" | "private" | "mine">("private");

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        load();
    }, [filter]);

    const load = async () => {
        setLoading(true);
        setUsers([]);
        setError(null);

        try {
            let data: User[] = [];
            
            if (filter === "public") {
                data = await UserService.getUsers();
            } else if (filter === "private") {
                data = await UserService.getFollowers();
            } else {
                data = await UserService.getFollowing();
            }

            setUsers(data);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar usuários.");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return { users, filter, setFilter, search, setSearch, loading, error };
}