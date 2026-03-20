export type Profile = {
  id: string;
  username: string;
  name: string | null;
  best_meal: string | null;
  go_to_meals: string | null;
  about_me: string | null;
  avatar_url: string | null;
  city: string | null;
  has_onboarded: boolean;
  created_at: string;
};