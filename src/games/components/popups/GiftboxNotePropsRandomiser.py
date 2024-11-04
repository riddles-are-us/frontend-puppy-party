import random


def generate_random_positions(num_positions=10):
    note_paths = [f"note{i}" for i in range(1, 11)]
    random.shuffle(note_paths)
    
    positions = []
    for count in range(num_positions):
        positions.append(f'''{{
            startPosition: {{ x: {random.randint(0, 40)}, y: {random.randint(20, 40)} }},
            popupAnimationDelay: {"{:.2f}".format(count * 0.05)},
            rewardAnimationDelay: {"{:.2f}".format(count * 0.1)},
            shakeAnimationDelay: {"{:.2f}".format(random.uniform(0, 1))},
            opacity: {"{:.2f}".format(random.uniform(0.4, 0.8))},
            noteImagePath: {note_paths[count]},
        }},'''
  )
    return positions


random_positions = generate_random_positions()
for position in random_positions:
    print(position)
