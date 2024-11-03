import random

# Function to generate random start positions
def generate_random_positions(num_positions=10):
    positions = []
    for count in range(num_positions):
        x = random.randint(0, 40)
        y = random.randint(20, 40)
        positions.append(f'''{{
    startPosition: {{ x: {x}, y: {y} }},
    popupAnimationDelay: {"{:.2f}".format(count * 0.05)},
    rewardAnimationDelay: {"{:.2f}".format(count * 0.1)},
    noteImagePath: note{count + 1},
  }},'''
  )
    return positions

# Generate and print 10 random start positions
random_positions = generate_random_positions()
for position in random_positions:
    print(position)
