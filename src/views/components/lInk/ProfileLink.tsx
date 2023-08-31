import Link from 'next/link'
import styled from '@emotion/styled';

const UserLink = styled('a')({
  fontWeight: 800, 
  marginLeft: "7px", 
  marginRight: "7px",
  textDecoration: "none",
  color: "black",
  "&:hover": {
    textDecoration: "underline",
    color: "blue"
  }
});

const ProfileLink = ({ profileId, userName }) => {
  return (
    <Link
      href={`/profile/${profileId}`}
      passHref
      legacyBehavior
    >
      <UserLink>
      {userName}
      </UserLink>
    </Link>
  )
}
export default ProfileLink