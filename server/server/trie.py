class Singleton:
    def __init__(self, decorated):
        self._decorated = decorated

    def Instance(self):
        try:
            return self._instance
        except AttributeError:
            self._instance = self._decorated()
            return self._instance

    def __call__(self):
        raise TypeError('Singletons must be accessed through `Instance()`.')

    def __instancecheck__(self, inst):
        return isinstance(inst, self._decorated)


class Node:
    def __init__(self, size=26):
        self.link = [None] * size
        self.frequency = 0
        self.max_frequency = 0


@Singleton
class Trie:
    def __init__(self):
        self.root = Node()

    def insert(self, word, node=None, index=0):
        if node is None:
            node = self.root

        if index == len(word):
            node.frequency += 1
            node.max_frequency = max(node.max_frequency, node.frequency)
            return node.max_frequency

        letter = word[index]

        child_index = ord(letter) - ord('a')

        if node.link[child_index] is None:
            node.link[child_index] = Node()

        node.max_frequency = max(node.max_frequency, self.insert(
            word, node.link[child_index], index + 1))
        return node.max_frequency

    def find_max_frequency_word(self, node, prefix):
        highest_frequency_word = prefix if node.frequency > 0 else None
        highest_frequency = node.frequency

        for i in range(26):
            child = node.link[i]
            if child is not None and child.max_frequency > highest_frequency:
                completed_word = self.find_max_frequency_word(
                    child, prefix + chr(i + ord('a')))
                highest_frequency_word = completed_word
                highest_frequency = child.max_frequency

        return highest_frequency_word

    def autocomplete(self, prompt):
        current = self.root
        for letter in prompt:
            index = ord(letter) - ord('a')

            if current.link[index] is None:
                return None

            current = current.link[index]

        return self.find_max_frequency_word(current, prompt)

    def reset(self):
        self.root = Node()


if __name__ == "__main__":
    pass
