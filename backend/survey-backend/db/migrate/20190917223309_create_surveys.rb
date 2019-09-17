class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.string :survey_date
      t.text :survey_notes
      t.references :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
