import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/contexts/PremiumContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Crown,
  LogOut,
  Settings,
  BarChart3,
  Zap,
} from 'lucide-react';

interface ProfileMenuProps {
  variant?: 'default' | 'header';
}

export const ProfileMenu = ({ variant = 'default' }: ProfileMenuProps) => {
  const { user, logout, setShowAuthModal, setAuthModalMode } = useAuth();
  const { isPremium, state } = usePremium();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setAuthModalMode('login');
            setShowAuthModal(true);
          }}
        >
          Sign In
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setAuthModalMode('signup');
            setShowAuthModal(true);
          }}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-10 ${variant === 'header' ? 'hover:bg-primary-foreground/10' : ''}`}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name || user.email} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className={`text-sm font-medium leading-none ${variant === 'header' ? 'text-primary-foreground' : ''}`}>
                {user.name || user.email.split('@')[0]}
              </p>
              {isPremium && (
                <Badge variant="secondary" className="mt-0.5 h-4 text-[10px] bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600">
                  <Crown className="w-2.5 h-2.5 mr-0.5" />
                  {state.plan.toUpperCase()}
                </Badge>
              )}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Stats */}
        <div className="px-2 py-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-muted rounded-md p-2 text-center">
              <p className="font-bold text-base">{user.xp || 0}</p>
              <p className="text-muted-foreground">XP</p>
            </div>
            <div className="bg-muted rounded-md p-2 text-center">
              <p className="font-bold text-base">{user.level || 1}</p>
              <p className="text-muted-foreground">Level</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate('/progress')}>
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>My Progress</span>
        </DropdownMenuItem>

        {!isPremium && (
          <DropdownMenuItem onClick={() => navigate('/premium')} className="text-yellow-600">
            <Zap className="mr-2 h-4 w-4" />
            <span>Upgrade to Premium</span>
          </DropdownMenuItem>
        )}

        {isPremium && (
          <DropdownMenuItem onClick={() => navigate('/premium')}>
            <Crown className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Manage Subscription</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
