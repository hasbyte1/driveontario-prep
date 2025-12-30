import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { shareContent, generateShareText, createChallengeLink } from '@/lib/leaderboard';
import { getStoredProgress, getLevel } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import {
  Share2,
  Copy,
  Twitter,
  Facebook,
  MessageCircle,
  Swords,
  Check,
  Link,
} from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  shareType?: 'progress' | 'badge' | 'level' | 'streak' | 'test';
  shareData?: Record<string, unknown>;
}

export const ShareButton = ({
  variant = 'outline',
  size = 'default',
  className = '',
  shareType = 'progress',
  shareData,
}: ShareButtonProps) => {
  const { user } = useAuth();
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [challengeLink, setChallengeLink] = useState('');
  const [copied, setCopied] = useState(false);

  const progress = getStoredProgress();
  const level = getLevel(progress.xp);

  const defaultShareData = {
    questionsCompleted: progress.questionsCompleted,
    accuracy: progress.questionsCompleted > 0
      ? Math.round((progress.questionsCorrect / progress.questionsCompleted) * 100)
      : 0,
    level: level.level,
    levelName: level.name,
    levelIcon: level.icon,
    streak: progress.streak,
    ...shareData,
  };

  const handleShare = async () => {
    const data = generateShareText(shareType, defaultShareData);
    const success = await shareContent(data);
    if (success) {
      toast.success('Shared successfully!');
    } else {
      toast.info('Copied to clipboard!');
    }
  };

  const handleTwitterShare = () => {
    const data = generateShareText(shareType, defaultShareData);
    const tweetText = encodeURIComponent(`${data.text}\n\n${data.url || ''}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleFacebookShare = () => {
    const data = generateShareText(shareType, defaultShareData);
    const url = encodeURIComponent(data.url || window.location.origin);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const data = generateShareText(shareType, defaultShareData);
    const text = encodeURIComponent(`${data.title}\n\n${data.text}\n\n${data.url || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCreateChallenge = () => {
    const link = createChallengeLink(
      'questions',
      20,
      user?.name || 'A friend'
    );
    setChallengeLink(link);
    setShowChallengeDialog(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeLink);
      setCopied(true);
      toast.success('Challenge link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className}>
            <Share2 className="w-4 h-4" />
            {size !== 'icon' && <span className="ml-2">Share</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTwitterShare}>
            <Twitter className="w-4 h-4 mr-2" />
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleFacebookShare}>
            <Facebook className="w-4 h-4 mr-2" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWhatsAppShare}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Share on WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateChallenge}>
            <Swords className="w-4 h-4 mr-2" />
            Challenge a Friend
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Challenge Dialog */}
      <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              Challenge a Friend
            </DialogTitle>
            <DialogDescription>
              Send this link to challenge a friend to answer 20 questions. See who can get the best score!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Input
                value={challengeLink}
                readOnly
                className="flex-1 text-sm"
              />
              <Button size="icon" onClick={handleCopyLink}>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const text = encodeURIComponent(
                    `I challenge you to beat my G1 practice score! ${challengeLink}`
                  );
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const text = encodeURIComponent(
                    `I challenge you to beat my G1 practice score! ${challengeLink}`
                  );
                  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                }}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Challenge expires in 7 days
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareButton;
