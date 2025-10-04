import { User } from "@supabase/supabase-js";
import supabase from "./supabase";

export async function signUpUser(userEmail: string, pass: string): Promise<User | null> {
	const { data, error } = await supabase.auth.signUp({ email: userEmail, password: pass });

	if (error) {
		console.error('Problem to signUp', error);
		return (null);
	}
	return (data.user ?? null);
}

export async function checkLoggedIn(): Promise<User | null> {
	const { data: { session } } = await supabase.auth.getSession();
	if (session?.user)
		return (session.user);
	return (null);
}