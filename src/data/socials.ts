export interface Social {
  name: string;
  icon: string;
  url: string;
}

export const socials: Social[] = [
  { name: 'GitHub', icon: 'FiGithub', url: 'https://github.com/devanshshri16' },
  { name: 'LinkedIn', icon: 'FiLinkedin', url: 'https://linkedin.com/in/devansh-shrivastava' },
  { name: 'LeetCode', icon: 'FiCode', url: 'https://leetcode.com/u/devanshshri16/' },
  { name: 'HackerRank', icon: 'FiAward', url: 'https://hackerrank.com/devanshshri16' },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blog', href: '/blog' },
];