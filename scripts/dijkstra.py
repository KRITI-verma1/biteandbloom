# Number of vertices in the graph
V = 9

# A utility function to find the vertex with minimum
# distance value, from the set of vertices not yet included
# in shortest path tree
def minDistance(dist, sptSet):
    # Initialize min value
    min_dist = float('inf')
    min_index = -1

    for v in range(V):
        if not sptSet[v] and dist[v] <= min_dist:
            min_dist = dist[v]
            min_index = v

    return min_index

# A utility function to print the constructed distance
# array along with the path
def printSolution(dist, parent, src):
    print("Vertex \t Distance from Source \t Path")
    for i in range(V):
        print(f"{i} \t\t {dist[i]} \t\t\t\t {getPath(parent, i, src)}")

# A utility function to retrieve the path from source to destination
def getPath(parent, j, src):
    if parent[j] == -1 or j == src:
        return str(j)
    return getPath(parent, parent[j], src) + " -> " + str(j)

# Function that implements Dijkstra's single source
# shortest path algorithm for a graph represented using
# adjacency matrix representation
def dijkstra(graph, src):
    dist = [float('inf')] * V # The output array. dist[i] will hold the shortest distance from src to i
    sptSet = [False] * V # sptSet[i] will be True if vertex i is included in shortest path tree or shortest distance from src to i is finalized
    parent = [-1] * V # Array to store the shortest path tree

    # Initialize all distances as INFINITE and sptSet[] as False
    dist[src] = 0

    # Find shortest path for all vertices
    for count in range(V - 1):
        # Pick the minimum distance vertex from the set of
        # vertices not yet processed. u is always equal to
        # src in the first iteration.
        u = minDistance(dist, sptSet)

        # Mark the picked vertex as processed
        sptSet[u] = True

        # Update dist value of the adjacent vertices of the
        # picked vertex.
        for v in range(V):
            # Update dist[v] only if it is not in sptSet,
            # there is an edge from u to v, and total
            # weight of path from src to v through u is
            # smaller than current value of dist[v]
            if not sptSet[v] and graph[u][v] and dist[u] != float('inf') and dist[u] + graph[u][v] < dist[v]:
                dist[v] = dist[u] + graph[u][v]
                parent[v] = u

    # print the constructed distance array
    printSolution(dist, parent, src)

# driver's code
if __name__ == "__main__":
    # Let us create the example graph discussed above
    graph = [
        [0, 4, 0, 0, 0, 0, 0, 8, 0],
        [4, 0, 8, 0, 0, 0, 0, 11, 0],
        [0, 8, 0, 7, 0, 4, 0, 0, 2],
        [0, 0, 7, 0, 9, 14, 0, 0, 0],
        [0, 0, 0, 9, 0, 10, 0, 0, 0],
        [0, 0, 4, 14, 10, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 1, 6],
        [8, 11, 0, 0, 0, 0, 1, 0, 7],
        [0, 0, 2, 0, 0, 0, 6, 7, 0]
    ]

    # Function call
    dijkstra(graph, 0)
