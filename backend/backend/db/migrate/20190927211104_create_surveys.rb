class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.date :date
      t.string :client
      t.string :site
      t.string :surveyor
      t.string :mw

      t.timestamps
    end
  end
end
