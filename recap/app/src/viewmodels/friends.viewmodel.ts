import { useEffect, useState } from "react";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { Social } from "../models/social";

export function useFriendsViewModel() {
    const [filter, setFilter] = useState<"public" | "private" | "mine">("mine");

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // identifica manualmente quais usuários o "cliente" está seguindo
    const [following, setFollowing] = useState<Set<string>>(new Set());

    useEffect(() => {
        load();
    }, [filter, search]);

    const load = async () => {
        setLoading(true);
        setUsers([]);
        setError(null);

        try {
            const follows: Social[] = await UserService.getFollowing();
            const users = new Set(follows.map(u => u.followingId));
            setFollowing(users);

            let data: User[] = [];

            if (filter === "public") {
                data = await UserService.getUsers();
            } else {
                const allUsers = filter === "private" ? await UserService.getFollowers() : follows;
                const userId = filter === "private" ? 'followerId' : 'followingId';

                data = await Promise.all(allUsers.map(user => UserService.getUserById(user[userId])));
            }

            if (search) {
                data = data.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
            }
            
            setUsers(data);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar usuários.");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const follow = async (followingId: string) => {
        const response = await UserService.follow(followingId);

        if (response.success) {
            setFollowing(prev => new Set(prev).add(followingId));
            load();
        }

        return response;
    };

    const unfollow = async (followingId: string) => {
        const response = await UserService.unfollow(followingId);

        if (response.success) {
            setFollowing(prev => {
                const set = new Set(prev);
                set.delete(followingId);

                return set;
            });

            load();
        }

        return response;
    };

    return { load, users, filter, setFilter, search, setSearch, loading, error, follow, unfollow, following };
}