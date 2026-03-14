import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("coreinventory_auth") || '{"email":"user@example.com"}');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account</p>
      </div>
      <Card className="border-border max-w-lg">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Name</Label><Input defaultValue="Admin User" /></div>
          <div><Label>Email</Label><Input value={auth.email} disabled /></div>
          <div><Label>Role</Label><Input value="Administrator" disabled /></div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
