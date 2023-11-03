class Api::V1::TasksController < ApplicationController
  def index
    task_cards = []
    @organization.taskcards.each do |tc|
      taskcard = {
        id:tc.id,
        title: tc.title,
        order: tc.order,
        tasks: tc.tasks
      }
      task_cards.push(taskcard)
    end

    render json:{
      task_cards: task_cards
    }
  end

  def update_tasks
    ActiveRecord::Base.transaction do
      @organization.taskcards.destroy_all
      params["tasks"].each_with_index do |taskcard, index|
        @taskcard = @organization.taskcards.build(
          title: taskcard["title"],
          order: index
        )
        @taskcard.save!
        taskcard["tasks"].each_with_index do |task, i|
          @task = @taskcard.tasks.build(
            content: task["content"],
            order: i
          )
          @task.save
        end

      end
    end
    task_count = @organization.taskcards.joins(:tasks).count
    render json: {
      task_count: task_count
      }, status: :ok
   
  end

end
