// NavBar Types
type NavBarItemProps = {
  title: SupportedIcons;
  iconName: string;
  hyperlink: string;
  id: string;
};
export type NavBarProps = {
  navItems: NavBarItemProps[];
};

// Icon Types
enum SupportedIcons {
  Spotify = 'Spotify',
  'Apple Music' = 'Apple Music',
  SoundCloud = 'SoundCloud',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  YouTube = 'YouTube',
}

export type SocialIconProps = {
  icon: SupportedIcons;
  twClasses: string;
};
