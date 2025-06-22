import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BaseProps {
  avatarUrl?: string;
}

interface WithProfile extends BaseProps {
  isWithProfile: true;
  firstName: string; // required when profile is shown
}

interface WithoutProfile extends BaseProps {
  isWithProfile?: false; // or undefined
  firstName?: string; // optional when profile is not shown
}

type ProfileHeaderProps = WithProfile | WithoutProfile;

export default function Header({
  firstName,
  avatarUrl,
  isWithProfile = false,
}: ProfileHeaderProps) {
  const displayName = firstName || "User";
  const initials = firstName ? `${firstName[0]}$` : firstName?.[0] || "U";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className=" mx-auto px-4 py-4">
        <div className="flex lg:items-start items-center gap-3">
          {isWithProfile && (
            <Avatar className="h-10 w-10 ring-2 ring-blue-100">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back {isWithProfile ? `, ${firstName}` : ""}
            </h1>
            <p className="text-sm text-gray-500">
              Share your thoughts with the world
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
