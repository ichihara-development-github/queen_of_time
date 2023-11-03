class ApplicationController < ActionController::API

    include ActionController::Cookies
    include ActionController::RequestForgeryProtection

    
    protect_from_forgery except: :login
    before_action :set_params, except: [:login]
    before_action :logged_in?, except: [:login, :top, :health_check, :create]
    before_action :set_csrf_token
    
  
    def set_csrf_token
      cookies['CSRF-TOKEN'] = {
        domain: ENV["CLIENT_DOMAIN"],
        value: form_authenticity_token
      }
    end

      private

      def set_params
        @current_employee = Employee.find_by(id: session[:employee_id])
        @organization = @current_employee.organization if @current_employee
      end
    
      def logged_in?
        p @current_employee
        return render json: {}, status: :forbidden unless @current_employee
      end

end