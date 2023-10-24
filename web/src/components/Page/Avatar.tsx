import { Avatar } from '@nextui-org/avatar';
import { User } from '@nextui-org/user';
import { getServerSession } from 'next-auth';
import React from 'react';

// import { Container } from './styles';

const AvatarHeader: React.FC = async () => {
  const data = await getServerSession();
  console.log(data)
  return (
    <Avatar
      isBordered
      showFallback
      as="button"
      className="transition-transform"
      name={data?.user?.name || ""}
      size="sm"
      src={data?.user?.image || ""}
    />
  );
}

export const UserHeader: React.FC = async () => {
  const data = await getServerSession();
  console.log(data)
  return (
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
  );
}


export default AvatarHeader;