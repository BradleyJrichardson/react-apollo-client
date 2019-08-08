import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Icon, Label, Grid, Image, Card } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = props => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  if (!getPost) {
    return <p>Loading Post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size="small"
              float="right"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{createdAt}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
