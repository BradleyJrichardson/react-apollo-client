import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {createdAt}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} />

        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            floated="right"
            as="div"
            onClick={() => console.log("delete")}
          >
            <Icon name="trash" color="red" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
