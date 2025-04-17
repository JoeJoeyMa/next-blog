'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import GrowingUnderline from '@/components/ui/GrowingUnderline';
import Link from '@/components/mdxcomponents/Link';

interface TabSwitcherProps {
  featuredContent: React.ReactNode;
  homeContent: React.ReactNode;
  featuredLabel: string;
  homeLabel: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  featuredContent,
  homeContent,
  featuredLabel,
  homeLabel,
}) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'home'>('home');

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 text-3xl font-bold sm:text-4xl sm:leading-10 md:text-4xl">
        <span className="text-heading-400 dark:text-heading-400">Latest</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('home')}
            className={clsx(
              'transition-colors',
              activeTab === 'home'
                ? 'text-heading-400'
                : 'text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200'
            )}
          >
            <GrowingUnderline active={activeTab === 'home'}>
              posts
            </GrowingUnderline>
          </button>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <button
            onClick={() => setActiveTab('featured')}
            className={clsx(
              'transition-colors',
              activeTab === 'featured'
                ? 'text-heading-400'
                : 'text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200'
            )}
          >
            <GrowingUnderline active={activeTab === 'featured'}>
               Featured
            </GrowingUnderline>
          </button>
        </div>
      </div>
      <div className="mt-8">
        {activeTab === 'featured' ? featuredContent : homeContent}
      </div>
    </div>
  );
};

export default TabSwitcher; 