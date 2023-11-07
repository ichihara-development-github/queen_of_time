module Api
    module V1
        class ConfigsController < ApplicationController

            def profile_setting
                render json: {
                    name: @current_employee.name,
                    profile: @current_employee.profile,
                    image: @current_employee.image
                    }, status: :ok
            end

            def update_profile
                @current_employee.profile.update!(
                    profile_params
                )
                @current_employee.update(
                    image: params[:profile][:image]
                ) if params[:profile][:image]
                render json: {}, status: :ok
            end

            def update_org_config
                ActiveRecord::Base.transaction do

                    @organization.update!(
                        name: params[:config][:name],
                        address: params[:config][:address],
                    )
                    @organization.configure.update!(
                        org_params
                    )
                end
                render json: {
                    config: @organization.configure,
                    orgName: @organization.name,
                    orgAddress: @organization.address,
                }, status: :ok
                
            end

            private

            def profile_params
                params.require(:profile).permit(:telephone, :email, :password)
            end

            def org_params
                params.require(:config).permit(
                    :open,
                    :close, 
                    :chat_notice, 
                    :min_work_time, 
                    :stampable_distance, 
                    :submittable_start, 
                    :submittable_end,
                    :red, :royalblue, :green, :orange)
            end
        end
    end
end
