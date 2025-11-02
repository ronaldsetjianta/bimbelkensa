import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Sesuaikan path jika perlu

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      // 1. Ambil sesi login saat ini
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }

      if (session) {
        const currentUser = session.user;
        setUser(currentUser);

        // 2. Jika ada user, ambil 'profile'-nya (untuk mendapatkan 'role')
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('role, username') // Ambil role dan username
          .eq('id', currentUser.id)
          .single();

        if (profileError) {
          console.error('Error getting profile:', profileError);
        } else if (userProfile) {
          setProfile(userProfile);
        }
      }
    };
    
    fetchSession();

    // 3. Dengarkan perubahan status login (jika user login/logout di tab lain)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user);
          // Ambil profile lagi saat baru login
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('role, username')
            .eq('id', session.user.id)
            .single();
          setProfile(userProfile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
      }
    );

    // Hentikan listener saat komponen tidak digunakan
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, profile };
};