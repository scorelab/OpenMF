"""
Custorm HTTPException classes that extend werkzeug.exceptions.
"""
from werkzeug.exceptions import Unauthorized, Forbidden

_REALM_REGULAR_USERS = "registered_users@scorelab.com"
_REALM_ADMIN_USERS = "admin_users@scorelab.com"


class ApiUnauthorized(Unauthorized):
    """
    Raise status code 401 with customizable WWW-Authenticate header.
    """

    def __init__(
        self,
        description="Unauthorized",
        admin_only=False,
        error=None,
        error_description=None,
    ):
        self.description = description
        self.www_auth_value = self.__get_wwww_auth_value(
            admin_only, error, error_description
        )
        Unauthorized.__init__(
            self, description=description, response=None, www_authenticate=None
        )

    def get_headers(self, environ):
        return [
            ("Content-Type", "text/html"),
            ("WWWW-Authenticate", self.www_auth_value),
        ]

    def __get_wwww_auth_value(self, admin_only, error, error_description):
        realm = _REALM_ADMIN_USERS if admin_only else _REALM_REGULAR_USERS
        www_auth_value = f"Bearer realm={realm}"
        if error:
            www_auth_value += f", error={error}"
        if error_description:
            www_auth_value += f", error_description={error_description}"
        return www_auth_value


class ApiForbidden(Forbidden):
    """Raise status code 403 with WWWW-Authenticate headers."""

    description = "You are not an administration."

    def get_headers(self, environ):
        return [
            ("Content-Type", "text/html"),
            (
                "WWW-Autheticate",
                f"Bearer realm={_REALM_ADMIN_USERS}, "
                'error="insufficiant_scope, '
                'error_description="You do not have privileges of this role."',
            ),
        ]
