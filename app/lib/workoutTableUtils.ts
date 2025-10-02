import supabase from './supabase'

interface Profile {
	username: String;
	full_name: String;
	gender: String;
	birth_data: Date;
	height_cm: number;
	weight_kg: number;
}

export async function getUser() {
	const { data, error } = await supabase.from('profiles').select('*');

	if (error) {
		console.error('Problem loading User Table', error);
		return [];
	}
	return (data);
}

export async function setUser(user: Profile) {;
	const { data, error } = await supabase.from('profiles').insert([user]);

	if (error) {
		console.error('Problem insert to User Table', error);
		return [];
	}
}