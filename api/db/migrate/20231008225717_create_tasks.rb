class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    # drop_table :tasks
    # drop_table :taskcards
    create_table :tasks do |t|
      t.references :taskcard, null: false,forign_key: true
      t.string :content
      t.integer :order
      t.timestamps
    end
  end
end
