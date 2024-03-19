import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import {Box} from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleRemoval, admin }) => {
  return (
    <Box borderRadius="full" overflow="hidden" display="inline-block">
      <Badge
        px={2}
        py={1}
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="rgb(0, 123, 255)"
        color="white"
        cursor="pointer"
        onClick={handleRemoval}
      >
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
        <CloseIcon pl={1} />
      </Badge>
    </Box>
  );
};

export default UserBadgeItem;