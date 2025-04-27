import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function ChangePassword() {
    const location = useLocation();
    const { userId } = location.state || {};
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }

        try {
            await axios.post(`http://localhost:3001/user/change-password/${userId}`, {
                newPassword,
            });

            toast.success("Password changed successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black border-none">
                <CardHeader className="text-center space-y-1 pb-2">
                    <CardDescription className="text-white text-3xl font-bold">Change Your Password</CardDescription>
                    <CardDescription className="text-white">Enter and confirm your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-400 block">New Password</label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="********"
                                className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 pl-0 text-white"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-400 block">Confirm Password</label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                                className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 pl-0 text-white"
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
