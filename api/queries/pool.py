import os
from psycopg_pool import ConnectionPool

# Global instance of ConnectionPool for managing PostgreSQL connections.
# This pool facilitates efficient database connection management by reusing
# existing connections, thereby optimizing performance and resource utilization.
#
# The pool is initialized with connection information (conninfo) which is
# typically stored in an environment variable. This approach enhances security
# and flexibility, allowing the database URL to be changed without modifying
# the codebase. The environment variable 'DATABASE_URL' should contain the
# necessary connection details in a standard URI format.
#
# Usage of this pool across the application ensures that all database interactions
# are handled consistently and efficiently, leveraging the robustness and
# scalability of the psycopg library.

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
