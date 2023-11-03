Rails.application.routes.draw do

  root to: "welcome#top"
  get "health_check", to: "responses#health_check"
  
  namespace :api do
    namespace :v1 do
   
      resources :organizations, only: :create do
        collection  do
          get :manage_timestamps
          get :employees_shifts
          get :employees_unapproved_shifts
          resources :calendars, only: %i[index create update destroy]
          resources :tasks, only: %i[index] do
            collection do
              patch :update_tasks
            end
          end
        end
       
      end
    resources :rooms, only: %i[index create update destroy] do
        get :invite_employees, on: :collection    
        resources :messages, only: %i[index create destroy]
     end

      resources :employees, only: %i[index create destroy] do
        resources :profiles, only: %i[show, update]
        collection  do
          resources :shifts, only: %i[index new create update destroy] do
            collection do
              post :assign
              post :submit_shifts
              patch :determine_shifts
            end
          end
             resources :timestamps, only: %i[index new create] do
                collection do
                  patch :update
                  patch :modulate_timestamps
                end
              end
          resources :notifications, only: %i[index create destroy] do
              collection do
                patch :update_notification_read
                get :all_notifications
              end
          end
         
          get :initial_notifications
        end
      end      
 
      # resources :employees do
      #   resources :timestamps, only: %i[index new create] do
      #     collection do
      #       patch :update
      #       patch :modulate_timestamps

      #     end
      #   end
      #   resources :notifications, only: %i[index create destroy] do
      #     collection do
      #       patch :update_notification_read
      #       get :all_notifications
      #     end
      #   end
      #   get :initial_notifications, on: :member
      
      # end

      get "employees/shifts/assign_member/:date", to: "shifts#assign_member"
      patch "timestamps/approve", to: "timestamps#approve"
     
      get "org_config_setting", to: "configs#org_config_setting"
      get "organizations/employees_shifts", to: "organizations#employees_shifts"
      get "profile_setting", to: "configs#profile_setting"
      patch "update_profile", to: "configs#update_profile"
      patch "update_org_config", to: "configs#update_org_config"
      
      get "/check_session", to: "sessions#check_session"
      post "/login", to: "sessions#login"
      delete "/logout", to: "sessions#logout"

    end
  end
  
end
