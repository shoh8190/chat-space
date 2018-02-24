Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  get 'messages' =>'messages#index'
  resources :users, only: [:edit, :update]
end
