from datetime import datetime, timedelta

class SimpleCache:
    def __init__(self, duration: timedelta):
        self.duration = duration
        self.cache = {}
        self.timestamp = datetime.now()
        
    def set(self, key, value):
        self.cache[key] = value
        self.timestamp = datetime.now()
    
    def get(self, key):
        if (datetime.now() - self.timestamp) > self.duration:
            self.cache.pop(key, None)  # Invalidate the cache
        return self.cache.get(key)
