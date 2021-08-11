"""
Result class to represent output of an operation.
"""

# Class Result Definition
class Result:

    def __init__(self, success, error, value):
        """
        Contructor for Result Class.
        """
        self.success = success
        self.error = error
        self.value = value

    def __str__(self) -> str:
        """
        Informal string representation of output
        """
        if self.success:
            return "[Success]"
        else:
            return f"[Failure]: {self.error}"

    def __repr__(self) -> str:
        """
        Official string representation of output
        """
        if self.success:
            return f"<Result success={self.success}>"
        else:
            return f"<Result success={self.success}, message={self.error}>"

    @property
    def failure(self) -> bool:
        """
        Flag that indicates if the operation failed
        """
        return not self.success

    def on_success(self, func, *args, **kargs):
        """
        Pass result of successful operation (if any)
        to subsequent function.
        """
        if self.failure:
            return self
        if self.value:
            return func(self.value, *args, **kargs)
        return func(*args, **kargs)

    def on_failure(self, func, *args, **kargs):
        """
        Pass error message from failed operation
        """
        if self.success:
            return self.value if self.value else None
        if self.error:
            return func(self.error, *args, **kargs)
        return func(*args, **kargs)

    def on_both(self, func, *args, **kargs):
        """
        Pass result (either succeeded/failed) to
        subsequent function
        """
        if self.value:
            return func(self.value, *args, **kargs)
        return func(*args, **kargs)

    @staticmethod
    def Fail(error_message):
        """
        Create a Result object for a failed operation
        """
        return Result(False, value=None, error=error_message)

    @staticmethod
    def Ok(value=None):
        """
        Create a Result object for a successful operation
        """
        return Result(True, value=value, error=None)

    @staticmethod
    def Combine(results):
        """
        Returns a Result object based on the outcome of a list of results.
        """
        if all(result.success for result in results):
            return Result.Ok()
        errors = [result.error for result in results if result.failure]
        return Result.Fail("\n".join(errors))
