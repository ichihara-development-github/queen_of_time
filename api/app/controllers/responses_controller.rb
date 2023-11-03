
class ResponsesController < ApplicationController

    def health_check
        render json: {},status: :ok
    end
end

