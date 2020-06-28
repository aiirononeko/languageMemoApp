# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: "ミミたる", email: "mimi@example.com", password: "password",
                   confirmed_at: DateTime.now, username: SecureRandom.alphanumeric(15))
Post.create(name: "ミミたるポスト", content: "ミミミタルタル", user_id: user.id, folder_id: nil)
Folder.create(name: "ミミたるフォルダー", user_id: user.id)
