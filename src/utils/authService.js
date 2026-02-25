import { supabase } from '../lib/supabaseClient';

const CURRENT_USER_KEY = "user";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
    // Register a new user
    register: async (data) => {
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                },
            },
        });

        if (error) {
            return { data: { error: true, message: error.message } };
        }

        return {
            data: {
                error: false,
                message: "Registration successful!",
                data: {
                    email: authData.user.email,
                    name: authData.user.user_metadata.name,
                    _id: authData.user.id
                },
                session: authData.session
            },
        };
    },

    // Login a user
    login: async (data) => {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            return { data: { error: true, message: error.message } };
        }

        const user = authData.user;
        const userData = {
            name: user.user_metadata.name || user.email.split('@')[0],
            email: user.email,
            _id: user.id,
        };

        // Note: Supabase handles session storage automatically, 
        // but we sync with local storage for compatibility with existing code if needed.
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));

        return {
            data: {
                error: false,
                message: "Login successful!",
                data: userData,
                accessToken: authData.session.access_token,
                refreshToken: authData.session.refresh_token,
            },
        };
    },

    // Verify OTP (Supabase handles this via email links usually, but if needed:)
    verifyOtp: async (data) => {
        const { data: authData, error } = await supabase.auth.verifyOtp({
            email: data.email,
            token: data.otp,
            type: 'signup',
        });

        if (error) {
            return { data: { error: true, message: error.message } };
        }

        return { data: { error: false, message: "Email verified successfully!" } };
    },

    // Forgot Password
    forgotPassword: async (data) => {
        const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            return { data: { error: true, message: error.message } };
        }

        return { data: { error: false, message: "Password reset link sent to your email!" } };
    },

    // Reset Password
    resetPassword: async (data) => {
        const { error } = await supabase.auth.updateUser({
            password: data.newPassword,
        });

        if (error) {
            return { data: { error: true, message: error.message } };
        }

        return { data: { error: false, message: "Password reset successful!" } };
    },

    // Update User Profile
    updateProfile: async (data) => {
        const { data: authData, error } = await supabase.auth.updateUser({
            data: {
                name: data.name,
                // Add other metadata fields here if needed
            },
        });

        if (error) {
            return { data: { error: true, message: error.message, success: false } };
        }

        const updatedUser = {
            name: authData.user.user_metadata.name,
            email: authData.user.email,
            _id: authData.user.id,
        };

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

        return {
            data: {
                message: "Profile updated successfully!",
                data: updatedUser,
                error: false,
                success: true,
            },
        };
    },

    getOrders: async () => {
        await delay(500);
        try {
            const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
            if (!user) throw new Error("User not found!");

            const ordersKey = `orders_${user.email}`;
            let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

            return {
                data: {
                    data: orders,
                    error: false,
                    success: true,
                },
            };
        } catch (error) {
            return { data: { message: error.message, error: true, success: false } };
        }
    },

    saveOrder: async (orderData) => {
        await delay(1500); // Simulate payment processing time
        try {
            const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
            if (!user) throw new Error("User not found!");

            const ordersKey = `orders_${user.email}`;
            const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

            const newOrder = {
                id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
                date: new Date().toISOString().split('T')[0],
                status: "Processing",
                ...orderData,
            };

            const updatedOrders = [newOrder, ...existingOrders];
            localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));

            return {
                data: {
                    message: "Order placed successfully!",
                    data: newOrder,
                    error: false,
                    success: true,
                },
            };
        } catch (error) {
            return { data: { message: error.message, error: true, success: false } };
        }
    },

    // Logout
    logout: async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Supabase signOut error:", error);
        } finally {
            // Force clear local storage regardless of Supabase response
            localStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem("access Token");
            localStorage.removeItem("refresh Token");
            localStorage.removeItem("user"); // Just in case

            // Also clear any other session related data if any
            return { data: { error: false, message: "Logged out successfully!" } };
        }
    },
};

export default authService;
