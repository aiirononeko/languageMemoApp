FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    username { Faker::Internet.user_name(specifier: 'Nancy') }
    password { Faker::Internet.password(min_length: 8) }
  end
  
  factory :confirmed_user, class: User do
    name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    username { Faker::Internet.user_name(specifier: 'Nancy') }
    password { Faker::Internet.password(min_length: 8) }
    confirmed_at { Time.now - 100}
    trait :with_avatar do
      after(:build) do |user|
        file_path = Rails.root.join('spec', 'fixtures', 'test_image.jpg')
        file = fixture_file_upload(file_path, 'image/jpg')
        user.avatar.attach(file)
      end
    end
    trait :with_invalid_avatar do
      after(:build) do |user|
        file_path = Rails.root.join('spec', 'fixtures', 'test.txt')
        file = fixture_file_upload(file_path)
        user.avatar.attach(file)
      end
    end
  end
end
