export type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Comment = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export type NewComment = {
  review: {
    rating: number;
    comment: string;
  },
  id: number;
}

export type PostCommentActionType = {
  newComment: NewComment;
  onSuccess: () => void;
  onError: () => void;
}
