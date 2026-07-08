export interface Social {
  name: string;
  icon: string;
  url: string;
}

export const socials: Social[] = [
  { name: 'GitHub', icon: 'FiGithub', url: 'https://github.com/devanshshrivastava16' },
  { name: 'LinkedIn', icon: 'FiLinkedin', url: 'https://linkedin.com/in/devanshshrivastava' },
  { name: 'LeetCode', icon: 'FiCode', url: 'https://leetcode.com/u/phenomxdevansh/' },
  { name: 'HackerRank', icon: 'FiAward', url: 'https://hackerrank.com/devansh16' },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blog', href: '/blog' },
];