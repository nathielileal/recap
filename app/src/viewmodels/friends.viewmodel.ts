import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { Social } from "../models/social";
import { AuthService } from "../services/auth.service";
import { User } from "../models/User";

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
            const loggedUserId = await AuthService.getAuthIDUser();
            const follows: Social[] = await UserService.getFollowing(loggedUserId ?? '');
            const usersSet = new Set(follows.map(u => u.followingId));

            setFollowing(usersSet);

            let data: (User | null)[] = [];
            let allUsers: Social[] = [];
            let key: 'followerId' | 'followingId';

            if (filter === "public") {
                data = await UserService.getUsers();
            } else {
                allUsers = filter === "private" ? await UserService.getFollowers(loggedUserId ?? ''): follows;
                key = filter === "private" ? 'followerId' : 'followingId';

                const user = allUsers.filter(entry => {
                    const targetId = entry[key];
                    return targetId && targetId !== 'undefined';
                });

                data = await Promise.all(user.map(entry => UserService.getUserById(entry[key])));
            }

            let results: User[] = data.filter((user): user is User => user !== null && user !== undefined);

            if (loggedUserId) {
                results = results.filter(user => user.id !== loggedUserId);
            }

            if (search) {
                results = results.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
            }

            setUsers(results);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar usuários.");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const follow = async (followingId: string) => {
        const loggedUserId = await AuthService.getAuthIDUser();
        const response = await UserService.follow(followingId, loggedUserId ?? '');

        if (response.success) {
            setFollowing(prev => new Set(prev).add(followingId));
            load();
        }

        return response;
    };

    const unfollow = async (followingId: string) => {
        const loggedUserId = await AuthService.getAuthIDUser();
        const response = await UserService.unfollow(followingId, loggedUserId ?? '');

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