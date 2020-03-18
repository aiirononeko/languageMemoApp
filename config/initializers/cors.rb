Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3001' #ここにうんたら.comみたいな許可したいオリジンを指定する
    resource '*', :headers => :any, :methods => [:get, :post, :delete, :patch, :put, :options], :expose => ['access-token', 'uid', 'client']
  end
end