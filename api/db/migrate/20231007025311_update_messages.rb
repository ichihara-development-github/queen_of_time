class UpdateMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages,:send_date,:string
    remove_column :messages, :mention,:string
  end
end
