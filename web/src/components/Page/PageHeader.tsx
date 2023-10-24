import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown';
import { Image } from '@nextui-org/image';
import { User } from '@nextui-org/user';
import { Box } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import SelectTheme from './SelectTheme';

const PageHeader: React.FC = () => {
  const { data } = useSession()
  return (
    <header className="flex w-full bg-foreground-100 p-5 justify-between items-center gap-3 h-20">
      <Box asChild>
        <Link href="/" className="flex items-center">
          <Image src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
        </Link>
      </Box>
      <Box>
        <Dropdown backdrop='opaque' placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              showFallback
              as="button"
              className="transition-transform"
              name={data?.user?.name || ""}
              size="sm"
              src={data?.user?.image || ""}
            />
          </DropdownTrigger>

            <DropdownMenu
              aria-label="Custom item styles"
              className="p-3"
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
                  <User
                    name={data?.user?.name}
                    description={data?.user?.email}
                    classNames={{
                      name: "text-default-600",
                      description: "text-default-500",
                    }}
                    avatarProps={{
                      size: "sm",
                      src: data?.user?.image || undefined
                    }}
                  />
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem key="quick_search" shortcut="⌘K">
                  Quick search
                </DropdownItem>
                <DropdownItem
                  isReadOnly
                  key="theme"
                  endContent={<SelectTheme />}
                >
                  Theme
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Help & Feedback" showDivider>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => signOut({
                  redirect: true
                })}>
                  Log Out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
        </Dropdown>
      </Box>
    </header>
  );
}

export default PageHeader;