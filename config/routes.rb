Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/:username', to: 'users#show'
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions',
        omniauth_callbacks: "api/v1/auth/omniauth_callbacks"
      }
      resources :posts, only: [:show, :create, :update, :destroy]
      resources :folders, only: [:show, :create, :update, :destroy]
    end
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
